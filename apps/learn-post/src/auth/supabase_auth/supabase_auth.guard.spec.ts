import { SupabaseAuthGuard } from './supabase_auth.guard';

describe('SupabaseAuthGuard', () => {
  it('should be defined', () => {
    expect(new SupabaseAuthGuard()).toBeDefined();
  });
});
