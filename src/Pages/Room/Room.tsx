import React, { FormEvent, useState } from 'react';
import { useEffect } from 'react';
import {useParams} from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';

import { Button } from '../../components/button';
import {RoomCode } from '../../components/room_code';
import { useAuth } from '../../Hooks/useAuth';
import { database } from '../../Services/firebase';

import '../../styles/room.scss';

type FirebaseQuestions = Record<string, {
  author: {
    name: string; 
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighed: boolean;
}>

type Question = {
  id: string;
  author: {
    name: string; 
    avatar: string;
  },
  content: string;
  isAnswered: boolean;
  isHighlighed: boolean;
}

type RoomParams={
  id: string;
}

export const Room: React.FC = () => {
  const { user } = useAuth();
  const parans = useParams<RoomParams>();
  const [newQuestion, setNewquestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  const roomId = parans.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.once('value', room =>{
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) =>{
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighed: value.isHighlighed,
          isAnswered: value.isAnswered
        }
      });
      setQuestions(parsedQuestion);
      setTitle(databaseRoom.title);
      
    })

  }, [roomId]);

  async function handleSendNewQuestion(event: FormEvent) {
    event.preventDefault();

    if(newQuestion.trim() === ''){
      return;
    }
    
    if(!user){
      throw new Error('You must be logged in');
    }

    const question ={
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighed: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewquestion('');
  } 

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="letmeask"/>
          <RoomCode
            code={roomId}
          />
        </div>
      </header>

      <main >
        <div className="room-title">
          <h1>Sala {title}</h1>
          {
            questions.length > 0 && <span> {questions.length} pergunta(s)</span>
          }
          
        </div>
        <form onSubmit={handleSendNewQuestion}>
          <textarea 
            placeholder="O que voce quer perguntar"
            onChange={event => setNewquestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {
              user ? (
                <div className="user-info">
                  <img src={user.avatar.toString()} alt={user.name.toString() } />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta, <button> fa??a seu login</button>
                </span>
              )
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>
        
        {JSON.stringify(questions)}

      </main>
    </div>
  );
}

