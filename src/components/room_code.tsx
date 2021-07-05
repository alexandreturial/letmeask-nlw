import copyImg from '../assets/images/copy.svg';

import '../styles/room_code.scss';

type RoomCodePropps={
  code: string;
}

export function RoomCode(props: RoomCodePropps){
  function copyRoomCodeToClipboard(){
    navigator.clipboard.writeText(props.code);
  }

  return(
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="copy room code"/>
      </div>
      <span>
        Sala #{props.code}
      </span>
    </button>
  );
}