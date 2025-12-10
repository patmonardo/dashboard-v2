# Codegen Patterns Analysis

## Overview
Dashboard-v3 serves as a **reference implementation** for codegen patterns. The hand-written models (Customer, Invoice, Revenue) establish the baseline patterns that will be automated in the Organon project using Cypher queries against the Neo4j FormDB.

This document captures what a **FormShape → Code Generator** should produce.

---

## Context: FormDB Stores Sciences

FormDB is **not a general data processing platform**. It stores **Sciences** - structured knowledge domains with:
- **Semantics**: What data *means* in a domain (Customer is a business entity, Invoice is a contract/obligation)
- **Constraints**: Rules that govern valid states (SHACL shapes, cardinality, validation)
- **Transformations**: How knowledge morphs between representations (FormMorph)
- **Perspectives**: Analytical dimensions and aggregations (FormAspect)

This means the codegen isn't just mechanical template filling - it's **encoding domain knowledge** into executable code. Each generated class carries the science's semantics with it.

---

---

## 1. Schema Pattern (`app/lib/data/schema/*.ts`)

**Purpose**: Encode the Science's structure and constraints into Zod validators. This is where domain semantics become enforceable rules.

### Template Structure
```
// 1. Import base schemas
import { BaseSchema, BaseStateSchema } from './base'

// 2. Define domain-specific enums/types (if any)
export const StatusSchema = z.enum([...])

// 3. Core Entity Schema
export const EntitySchema = BaseSchema.extend({
  field1: z.type(),
  field2: z.type(),
  // ... domain fields
})

// 4. Join schemas (if has relationships)
export const EntityWithRelationSchema = EntitySchema.extend({
  relation: RelatedSchema
})

// 5. State Schema
export const EntityStateSchema = BaseStateSchema.extend({
  errors: z.object({
    field1: z.array(z.string()).optional(),
    field2: z.array(z.string()).optional(),
    // ... mirror of core fields
  }).optional()
})

// 6. Shape Schema
export const EntityShapeSchema = z.object({
  base: EntitySchema,
  state: EntityStateSchema
})

// 7. CRUD Schemas (Create/Update without id, createdAt, updatedAt)
export const CreateEntitySchema = EntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
})

export const UpdateEntitySchema = EntitySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true
}).partial()

// 8. Type exports
export type Entity = z.infer<typeof EntitySchema>
export type EntityWithRelation = z.infer<typeof EntityWithRelationSchema>
export type EntityState = z.infer<typeof EntityStateSchema>
export type EntityShape = z.infer<typeof EntityShapeSchema>
export type CreateEntity = z.infer<typeof CreateEntitySchema>
export type UpdateEntity = z.infer<typeof UpdateEntitySchema>
```

### Codegen-able Parts
✅ **100% Mechanical**:
- State Schema errors object (mirrors core fields)
- Shape Schema wrapper
- Create/Update Schemas (omit + partial pattern)
- Type exports (all derived from Zod)

⚠️ **Needs Domain Input**:
- Core entity fields (from Prisma schema or FormShape)
- Enums (from domain/business rules)
- Join relationships (which entities to include)

---

---

## 2. Model Pattern (`app/lib/model/*.ts`)

**Purpose**: Encode the Science's operations and rules into executable code. Models are the active manifestation of the domain knowledge.

### Base Model
```typescript
export abstract class BaseModel<T extends BaseShape> {
  constructor(schema: z.ZodType<T>, shape: T)
  
  get state(): BaseState
  get value(): Base
  get fullShape(): BaseShape
  
  validate(): T
  map<U extends BaseShape>(fn: (shape: T) => U): U
}
```

### Concrete Model Template
```typescript
export class EntityModel extends BaseModel<EntityShape> {
  constructor(entity?: Entity) {
    const shape: EntityShape = {
      base: entity || ({} as Entity),
      state: { status: "active", validation: {}, message: undefined }
    }
    super(EntityShapeSchema, shape)
  }

  // ===== CORE CRUD OPERATIONS =====
  
  static async create(data: CreateEntity): Promise<OperationResult<Entity>> {
    try {
      const validated = CreateEntitySchema.safeParse(data)
      if (!validated.success) {
        return { data: null, status: "error", message: "Validation failed" }
      }
      
      const entity = await prisma.entity.create({
        data: {
          id: crypto.randomUUID(),
          ...validated.data,
          // Set defaults for timestamp fields if needed
          createdAt: new Date(),
          updatedAt: new Date()
        },
        include: { /* related entities */ }
      })
      
      return { data: entity, status: "success", message: "Created" }
    } catch (error) {
      return { data: null, status: "error", message: "Failed to create" }
    }
  }

  static async update(id: string, data: UpdateEntity): Promise<OperationResult<Entity>> {
    // Similar pattern: validate, Prisma update, return OperationResult
  }

  static async delete(id: string): Promise<OperationResult<Entity>> {
    // Similar pattern
  }

  // ===== QUERY OPERATIONS =====
  
  static async findById(id: string): Promise<OperationResult<Entity>> {
    // Validate exists, return single record
  }

  static async findAll(options?: { query?, page?, pageSize? }): Promise<OperationResult<Entity[]>> {
    // Search/filter, pagination, return array
  }

  static async count(): Promise<number> {
    // Return count
  }

  // Instance method (optional)
  markAsArchived(): EntityModel {
    // Transform state, return new instance
  }
}
```

### Codegen-able Parts
✅ **100% Mechanical**:
- Constructor pattern (fixed boilerplate)
- CRUD method signatures
- try/catch pattern with OperationResult wrapper
- Error messages (template: "Failed to {action} {Entity}")
- Validation check pattern
- crypto.randomUUID() for id generation
- Date() for timestamps
- Return statement patterns

⚠️ **Needs Configuration**:
- Which fields to include in Prisma operations
- Which relationships to load (include: {})
- Custom query logic (findAll parameters/filters)
- Domain-specific instance methods (markAsArchived)

⚠️ **Variations Observed**:
- **CustomerModel**: Extends BaseModel, has isActive() method
- **InvoiceModel**: Extends BaseModel, includes customer relation
- **RevenueModel**: Does NOT extend BaseModel (standalone)

---

## 3. Entity Types

### Full Entity (Form-focused)
Used for entities that appear in forms, have user state, and participate in relationships.

**Examples**: Customer, Invoice
**Characteristics**:
- Extends BaseModel (carries validation state)
- CRUD operations
- Instance methods for state transitions
- Relationships/includes in queries
- State validation context

### Value Entity (Analytics-focused)
Used for entities primarily consumed in dashboards/analytics, with aggregations and metrics.

**Examples**: Revenue
**Characteristics**:
- Standalone class (no BaseModel)
- CRUD operations
- Static-only methods
- Aggregation/metric queries
- No state validation needed

---

## 4. Pattern Consistency Check

### ✅ Consistent Across All Models
- Schema structure (BaseSchema extends, errors mirroring)
- CRUD operations (create, update, delete)
- Basic queries (findById, findAll, count)
- OperationResult<T> return type
- Prisma client usage
- UUID generation

### ⚠️ Valid Variations by Entity Type

| Aspect | Full Entity (Customer/Invoice) | Value Entity (Revenue) |
|--------|------|--------|
| Extends BaseModel | ✅ Yes | ❌ No (by design) |
| Instance methods | ✅ Yes (state transitions) | ❌ No (static-only) |
| Include relations | ✅ Yes | ❌ No (standalone) |
| State validation | ✅ Yes | ❌ No (aggregations instead) |
| Query complexity | Medium | High (metrics/aggregations) |

---

## 4. What Should Be Codegen'd?

### Schema Generation (95% Mechanical)
```
Input:  Prisma schema for "Customer" table
Output: app/lib/data/schema/customer.ts
        - CustomerSchema
        - CustomerStateSchema
        - CustomerShapeSchema
        - CreateCustomerSchema
        - UpdateCustomerSchema
        - Type exports
```

**Effort**: ~200 lines of code
**Skill**: Zod API knowledge
**Variability**: Low (pattern is fixed)

### Model Generation (85% Mechanical)
```
Input:  Customer schema + Prisma table definition
Output: app/lib/model/customer.ts
        - CustomerModel class
        - Constructor
        - CRUD methods
        - Query methods
```

**Effort**: ~250 lines of code
**Skill**: Prisma query patterns
**Variability**: Medium (relationships, special queries)

### Supporting Artifacts
- Test stubs (schema.test.ts, model.test.ts)
- View definitions (ui/view/customer.ts)
- Form handlers (actions/)

---

## 5. Codegen Implementation Strategy

### Phase 1: Baseline (This Review)
- ✅ Validate patterns are consistent
- ✅ Identify deviations and justify them
- ✅ Document template structure

### Phase 2: Schema Codegen
1. Parse Prisma schema
2. Extract field definitions
3. Generate Zod schemas
4. Add error mirrors
5. Emit Shape + CRUD schemas

### Phase 3: Model Codegen
1. Use generated schemas
2. Generate CRUD methods
3. Generate query methods
4. Handle relationships (if defined)

### Phase 4: Integration
- Auto-run on schema changes
- Update Prisma schema → triggers codegen
- Validate generated code (lint, compile)

---

## 6. Future: Cypher-based Codegen for Organon

Dashboard-v3 is a **manual proof of concept** for what Organon's codegen will automate.

### FormDB: A Graph of Sciences
```
Each Science is a property graph containing:

FormShape (the science's definition)
├─ Fields (what the science knows about)
├─ Constraints (what is valid, from FormContext:Property SHACL)
├─ Relationships (how entities relate within the science)
└─ Transformations (how knowledge morphs, from FormMorph)

All interconnected in Neo4j, ready to be queried and codegen'd
```

### How Codegen Preserves Science
When we codegen from FormDB:
1. **Zod schemas encode constraints** (min/max from SHACL → z.min())
2. **Model classes encode operations** (valid transitions, business rules)
3. **Type system preserves semantics** (Customer is not just data, it carries customer-ness)
4. **Error messages preserve domain language** ("Customer email must be valid" not "field_1 failed validation")

### Codegen Pipeline (Future)
```
FormShape nodes with labels:
├─ :Form (definition)
├─ :Shape (instance structure)
├─ :Entity (concrete data)
├─ :Context (SHACL constraints)
├─ :Property (field semantics)
├─ :Morph (transformations)
└─ :Aspect (analytical perspectives)

Connected relationships:
├─ HAS_FIELD
├─ HAS_SECTION
├─ HAS_CONTEXT
├─ CONSTRAINED_BY_PROPERTY
├─ TRANSFORMED_BY_MORPH
└─ ANALYZED_BY_ASPECT
```

### Codegen Pipeline (Future)
```
Neo4j FormDB (semantic source of truth)
  ↓ [Cypher query across property graph]
  ├─→ Generate Prisma schema.prisma
  ├─→ Generate Zod schemas (schema/*.ts)
  ├─→ Generate Model classes (model/*.ts)
  ├─→ Generate SQL DDL
  └─→ Generate Malloy models (analytics)
```

### What Cypher Will Do
- Traverse FormShape → extract fields, validation, relationships
- Generate consistency across outputs (type safety from Neo4j → code)
- Handle transformations (FormMorph → code generation rules)
- Validate constraints (FormContext:Property → Zod refinements)
- Support both Full Entity and Value Entity patterns

---

## Previous Sections

## 6. Files Reviewed
- `app/lib/data/schema/base.ts` - Base patterns
- `app/lib/data/schema/customer.ts` - Simple entity
- `app/lib/data/schema/invoice.ts` - Entity with relationship
- `app/lib/data/schema/revenue.ts` - Entity with aggregations
- `app/lib/model/base.ts` - Base model class
- `app/lib/model/customer.ts` - Simple model (CRUD only)
- `app/lib/model/invoice.ts` - Model with joins + advanced queries
- `app/lib/model/revenue.ts` - Model without BaseModel (anomaly)

---

## Next Steps for Dashboard-v3
1. ✅ Establish reference patterns (completed)
2. Maintain consistency within entity type (Full vs Value)
3. Use as validation baseline for Organon codegen

## Next Steps for Organon (Future)
1. Design Cypher queries to traverse FormDB
2. Extract FormShape → Entity metadata
3. Implement code generators (Prisma, Zod, Model)
4. Add constraint mapping (FormContext:Property → Zod refinements)
5. Support FormMorph transformations in generated code
