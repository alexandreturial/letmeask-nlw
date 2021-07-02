import React,{ FormEvent } from 'react';
import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { database } from '../../Services/firebase';

import { useAuth } from '../../Hooks/useAuth';

import { Button } from '../../components/button';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import '../../styles/auth.scss';

export const NewRoom: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  const [inputSala, setInputSala] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    
    if(inputSala.trim() === ''){
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: inputSala,
      authorId: user?.id,
    });

    history.push(`/room/${firebaseRoom.key}`);
  }

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
          <form  onSubmit={handleCreateRoom}>
            <input 
              type="text"
              placeholder="Nome da sala"
              onChange={ event => setInputSala(event.target.value) }
              value ={inputSala}
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

