import React from 'react';
import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';
import googleImg from '../../assets/images/google-icon.svg';

// import { Container } from './styles';

export const Home: React.FC = () => {
    return (
        <div>
            <aside>
                <img src={illustrationImg} alt="Ilustação simbolizando pergunta e respostas" />
                <strong>Crie salas de Q&anp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo-real</p>
                <main>
                    <div>
                        <img src={logoImg} alt="letmeask" />
                        <button>
                            <img src={googleImg} alt="logo google" />
                            crie sua sala com o Google
                        </button>
                        <div>ou entre em uma sala</div>
                        <div>
                            <form>
                                <input 
                                 type="text" 
                                 placeholder="Digite o codigo da sala"
                                />
                                <button type="submit">
                                    Entrar na sala
                                </button>
                            </form>
                        </div>
                    </div>
                </main>
            </aside>
        </div>
    );
}

