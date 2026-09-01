import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../App';
import { authService } from '../services/authService';
import { Stethoscope, UserPlus, LogIn, AlertCircle } from 'lucide-react';

const Login: React.FC = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setError('');
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (err: any) {
      console.error("Google Auth error:", err);
      if (err?.code === 'auth/cancelled-popup-request' || err?.code === 'auth/popup-closed-by-user') {
        setError('A janela de login do Google foi fechada ou cancelada.');
      } else {
        setError(err.message || 'Erro ao realizar login com a conta Google.');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegistering) {
      if (!name || !email || !password) {
        setError('Preencha todos os campos.');
        return;
      }
      const result = authService.register(email, password, name);
      if (typeof result === 'string') {
        setError(result);
      } else {
        login(result);
        navigate('/');
      }
    } else {
      const user = authService.login(email, password);
      if (user) {
        login(user);
        navigate('/');
      } else {
        setError('Credenciais inválidas.');
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-medical-100 rounded-full flex items-center justify-center">
            <Stethoscope className="h-8 w-8 text-medical-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isRegistering ? 'Criar nova conta' : 'Entrar no MedAssist'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegistering 
              ? 'Junte-se à nossa comunidade médica' 
              : 'Acesse suas ferramentas clínicas'}
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <p className="ml-3 text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="rounded-md shadow-sm space-y-4">
            {isRegistering && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome Completo</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-medical-500 focus:border-medical-500 focus:z-10 sm:text-sm mt-1"
                  placeholder="Dr. João Silva"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">E-mail</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-medical-500 focus:border-medical-500 focus:z-10 sm:text-sm mt-1"
                placeholder="medico@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 bg-white focus:outline-none focus:ring-medical-500 focus:border-medical-500 focus:z-10 sm:text-sm mt-1"
                placeholder="******"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-medical-600 hover:bg-medical-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500 transition-colors"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {isRegistering ? <UserPlus className="h-5 w-5 text-medical-500 group-hover:text-medical-400" /> : <LogIn className="h-5 w-5 text-medical-500 group-hover:text-medical-400" />}
              </span>
              {isRegistering ? 'Cadastrar' : 'Entrar'}
            </button>
          </div>
        </form>

        <div className="relative my-6 text-center">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-slate-200"></div>
          <span className="relative bg-white px-3 text-xs uppercase tracking-wider text-slate-400 font-semibold">ou</span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-lg text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-medical-500 transition-all shadow-sm duration-150 cursor-pointer"
        >
          <svg className="h-5 w-5 mr-1 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.859-3.578-7.859-8s3.53-8 7.859-8c2.46 0 4.105 1.025 5.047 1.926l3.253-3.133C18.31 1.214 15.514 0 12.24 0 5.58 0 0 5.37 0 12s5.58 12 12.24 12c6.96 0 11.57-4.83 11.57-11.75 0-.79-.085-1.396-.188-1.965H12.24z"
            />
          </svg>
          Entrar com o Google
        </button>

        <div className="text-center pt-2">
          <button 
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            className="text-sm text-medical-600 hover:text-medical-500 font-medium"
          >
            {isRegistering ? 'Já tem uma conta? Entre aqui' : 'Não tem conta? Cadastre-se gratuitamente'}
          </button>
        </div>
        
        {/* Helper for demo */}
        <div className="mt-6 border-t pt-4 text-xs text-gray-400 bg-gray-50 p-2 rounded">
            <p className="font-semibold">Credenciais de Teste:</p>
            <p>Admin: admin@med.com / 123456</p>
            <p>Assinante: sub@med.com / 123456</p>
            <p>Usuário: user@med.com / 123456</p>
        </div>
      </div>
    </div>
  );
};

export default Login;