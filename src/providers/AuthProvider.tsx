import { AuthConnect, ProviderOptions } from '@ionic-enterprise/auth';
import { isPlatform } from '@ionic/react';
import { PropsWithChildren, createContext, useState, useEffect } from 'react';

const isNative = isPlatform('hybrid');

const options: ProviderOptions = {
  // see the options setting above
};

const setupAuthConnect = async (): Promise<void> => {
  return AuthConnect.setup({
    platform: isNative ? 'capacitor' : 'web',
    logLevel: 'DEBUG',
    ios: { webView: 'private' },
    web: { uiMode: 'popup', authFlow: 'implicit' },
  });
};

export const AuthContext = createContext<{}>({});

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isSetup, setIsSetup] = useState<boolean>(false);

  useEffect(() => {
    setupAuthConnect().then(() => setIsSetup(true));
  }, []);

  return <AuthContext.Provider value={{}}>{isSetup && children}</AuthContext.Provider>;
};