
import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, isAuthenticated } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await login(email, password);
    setIsSubmitting(false);
  };

  const handleDemoLogin = async (role: 'admin' | 'user') => {
    setIsSubmitting(true);
    if (role === 'admin') {
      await login('admin@company.com', 'admin123');
    } else {
      await login('user@company.com', 'user123');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Process Management Suite</CardTitle>
          <CardDescription>Sign in to access your workspace</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* One-click Demo Login */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-center text-muted-foreground">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="default"
                className="h-auto py-3 flex flex-col items-center gap-1"
                onClick={() => handleDemoLogin('admin')}
                disabled={isSubmitting}
              >
                <Zap className="h-4 w-4" />
                <span className="text-sm font-semibold">Admin Login</span>
                <span className="text-xs opacity-80">Full access</span>
              </Button>
              <Button
                variant="secondary"
                className="h-auto py-3 flex flex-col items-center gap-1"
                onClick={() => handleDemoLogin('user')}
                disabled={isSubmitting}
              >
                <Zap className="h-4 w-4" />
                <span className="text-sm font-semibold">User Login</span>
                <span className="text-xs opacity-80">Standard access</span>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">or sign in manually</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required />
                <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
