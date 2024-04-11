import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonLoading,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { bodyOutline, businessOutline, chatboxEllipses, chatboxEllipsesOutline, chatbubbleEllipsesOutline, documentTextOutline, ellipse, personOutline, triangle } from 'ionicons/icons';

import Orders from './pages/Orders';
import Tab2 from './pages/Tab2';
import Profile from './pages/Profile';
import Details from './pages/Feedback';
import Login from './pages/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import firebaseConfig from './firebaseConfig';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import EditProfile from './pages/EditMasterProfile';
import Registration from './pages/Registration';
import Registration2 from './pages/Registration2';
import Registration3 from './pages/Registration3';
import Resume from './pages/Resume';
import EditResume from './pages/EditResume';
import Feedback from './pages/Feedback';
import EditMasterProfile from './pages/EditMasterProfile';
import EditCustomerProfile from './pages/EditCustomerProfile';
import ObjectAddress from './pages/ObjectAddress';
import Estimate from './pages/Estimate';
import NewObjectAddress from './pages/NewObjectAddress';
import CallMeasurer from './pages/CallMeasurer';
import { checkAuth, getUserType } from './services/userData';
import CustomerOrders from './pages/CustomerOrders';
import NewCustomerOrder from './pages/NewCustomerOrder';
import NewEstimate from './pages/NewEstimate';
import Stories from './services/Slides';
import Home from './services/Slides';
import Slides from './services/Slides';

setupIonicReact();

const App: React.FC = () => {

  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [userType, setUserType] = useState<string | undefined>()

  const auth = getAuth();

  // Проверка авторизованности
  // onAuthStateChanged(auth, (user) => {
  //   console.log('onAuthStateChanged')
  //   if (user) {
  //     setLoggedIn(true)
  //     console.log(user)
  //   } else {
  
  //   }
  // });

  useEffect(() => {
    if(checkAuth()) {
      setUserType(getUserType())
      setLoggedIn(true)
    }
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        {loggedIn ? (
          <IonTabs>
            <IonRouterOutlet>     
              <Route component={Orders} path="/orders" />
              <Route component={CustomerOrders} exact path="/customer_orders" />
              <Route component={NewCustomerOrder} exact path="/customer_orders/new" />
              <Route component={Details} path="/tab2/details" />
              <Route component={Profile} path="/profile" />
              <Route component={EditMasterProfile} path="/edit_master_profile" />
              <Route component={EditCustomerProfile} path="/edit_customer_profile" />
              <Route component={Resume} path="/resume" />
              <Route component={EditResume} path="/edit_resume" />
              <Route component={Feedback} path="/feedback" />
              <Route component={ObjectAddress} exact path="/object_addresses" />
              <Route component={NewObjectAddress} path="/object_addresses/new" />
              <Route component={Estimate} exact path="/estimates" />
              <Route component={NewEstimate} path="/estimates/new" />
              <Route component={CallMeasurer} path="/call_measurer" />
              <Route component={Home} path="/stories" />
              <Redirect exact from="/" to="/orders" />
            </IonRouterOutlet>
            {userType === 'master' ? (
              <IonTabBar slot="bottom">
                <IonTabButton tab="tab1" href="/orders">
                  <IonIcon aria-hidden="true" icon={documentTextOutline} />
                  <IonLabel>Заказы</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab2" href="/feedback">
                  <IonIcon aria-hidden="true" icon={chatbubbleEllipsesOutline} />
                  <IonLabel>Поддержка</IonLabel>
                </IonTabButton>
                <IonTabButton tab="tab3" href="/profile">
                  <IonIcon aria-hidden="true" icon={personOutline} />
                  <IonLabel>Кабинет</IonLabel>
                </IonTabButton>
              </IonTabBar>
              ) : (
                <IonTabBar slot="bottom">
                  <IonTabButton tab="tab1" href="/customer_orders">
                    <IonIcon aria-hidden="true" icon={documentTextOutline} />
                    <IonLabel>Заказы</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab2" href="/call_measurer">
                    <IonIcon aria-hidden="true" icon={bodyOutline} />
                    <IonLabel>Вызвать замерщика</IonLabel>
                  </IonTabButton>
                  <IonTabButton tab="tab4" href="/profile">
                    <IonIcon aria-hidden="true" icon={personOutline} />
                    <IonLabel>Кабинет</IonLabel>
                  </IonTabButton>
                </IonTabBar>
              )}
          </IonTabs>
        ) : (
          <IonRouterOutlet>
            <Route component={Login} path="/login" />
            <Route component={Registration} path="/reg" />
            <Route component={Registration2} path="/reg2" />
            <Route component={Registration3} path="/reg3" />
            <Redirect exact from="/" to="/login" />
          </IonRouterOutlet>
        )}
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
