import React from 'react';
import { useAuth } from '../../Hooks/useAuth';

import { Link } from 'react-router-dom';
import { Button } from '../../components/button';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import '../../styles/auth.scss';

export const NewRoom: React.FC = () => {
  const { user } = useAuth();
  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Ilustação simbolizando pergunta e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiencia em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? 
            <Link to="/"> click aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}

