import Button from '@mui/material/Button';

export default function LoginType() {
  return (
    <div className='verticalCenter h100 w100'>
      <div className='w100'>
        <div className={'horizontalCenter p-b-16'}>
          <Button variant="contained">SOU JOGADOR</Button>
        </div>
          
        <div className='horizontalCenter p-t-16'>
          <Button variant="contained">SOU PROPRIETÁRIO</Button>
        </div>
      </div>
    </div>
  );
}
