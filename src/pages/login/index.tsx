import { UserType } from '@/enums/user-type.enum';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Login() {

  const [ type, setType ] = useState<UserType>();
  const router = useRouter();
  const { query } = router;
  
  useEffect(() => {
    if(router.isReady) {
      if(query.t == 'player') {
        setType(UserType.PLAYER);
      }
      else if (query.t == 'owner') {
        setType(UserType.OWNER);
      }
      else {
        router.push('/');
      }
    }
  }, [query]);

  const responseMessage = (response: any) => {
    console.log(jwtDecode(response.credential));
    
  };
  const errorMessage = (error: any) => {
    console.log(error);
  };

  return (
    <div className='h100 w100 verticalCenter horizontalCenter'>
      <div>
        <div>{type == UserType.OWNER ? 'OWNER' : 'PLAYER'}</div>
        <GoogleLogin onSuccess={responseMessage} onError={errorMessage as any} />
      </div>
    </div>
  );
}
