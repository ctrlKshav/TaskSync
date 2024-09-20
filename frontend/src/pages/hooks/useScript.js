import { useEffect } from 'react';

const useScript = ()=> {
  useEffect(() => {
    const script1 = document.createElement('script');
    const script2 = document.createElement('script');
    const script3 = document.createElement('script');

    script1.src="./script.js"

    script2.src = "https://apis.google.com/js/api.js";
    script2.async = true;
    script2.onload="gapisLoaded()"
    script2.defer = true

    script3.src = "https://accounts.google.com/gsi/client";
    script3.async = true;
    script3.onload="gisLoaded()"
    script3.defer = true

    document.body.appendChild(script1);
    document.body.appendChild(script2);
    document.body.appendChild(script3);
    

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
      document.body.removeChild(script3);
    }
  } );
};

export default useScript;