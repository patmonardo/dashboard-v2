import { describe, it, expect } from 'vitest'
import { CustomerView } from './customer'

describe('CustomerView', () => {
  it('should render a create form', () => {
    const customerView = new CustomerView();

    // Add console.log to see what's happening
    console.log('About to render customer view');

    const result = customerView.render('create', 'jsx');

    // Add more specific expectations
    expect(result).toBeDefined();
    expect(result).toHaveProperty('type'); // Should be a React element
    expect(result).toMatchObject({
      props: {
        children: expect.anything()
      }
    });
  });
});
