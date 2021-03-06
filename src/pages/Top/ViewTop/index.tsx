import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useState, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { SocialSharing } from "@ionic-native/social-sharing";

import { useTopList } from "../../../hooks";
import { Top } from "../../../types";
import { shareSocialOutline } from "ionicons/icons";
import TeamItem from "../TeamItem/TeamItem";
import "./ViewTop.css";

type ViewTopProps = RouteComponentProps<{
  title: string;
}>;

const ViewTop: React.FC<ViewTopProps> = ({ match }) => {
  const {
    params: { title },
  } = match;
  const { getLists, findTopByTitle } = useTopList();
  const [top, setTop] = useState<Top | undefined>();

  const openLink = (link?: string) => {
    if (!link) return;
    InAppBrowser.create(link, "_blank");
  };

  const shareOnclick = () => {
    SocialSharing.share("Message", "Subject");
  };

  useEffect(() => {
    getLists().then(() => setTop(findTopByTitle(title)));
  }, [getLists]);

  useEffect(() => {
    setTop(findTopByTitle(title));
  }, [title, findTopByTitle]);

  if (!top) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton/>
            </IonButtons>
            <IonTitle>Liste des top</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent id="viewTopPage">
          <p>Chargement</p>
        </IonContent>
      </IonPage>
    );
  }

  const { title: titleTop, items } = top;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton/>
          </IonButtons>
          <IonButtons slot="secondary">
            <IonButton onClick={shareOnclick}>
              <IonIcon slot="icon-only" icon={shareSocialOutline} />
            </IonButton>
          </IonButtons>
          <IonTitle>Liste des top</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent id="viewTopPage">
        <IonGrid>
          <IonRow>
            <IonCol>
              <h1 className="title_top">{titleTop}</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              {items.map((item) => (

                <TeamItem dexNumber={item}/>
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ViewTop;
