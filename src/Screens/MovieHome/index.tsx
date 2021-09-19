import React, {useContext, useLayoutEffect, useEffect} from "react";
import SplashScreen from "react-native-splash-screen";
import { StackNavigationProp } from "@react-navigation/stack";
import Styled from 'styled-components/native';

import { UserContext } from "~/Context/User";

import BigCatalogueList from './BigCatalogue';
import SubCatalogueList from './SubCatalogue';

const Container = Styled.ScrollView`
    flex: 1;
    background-color: #141414;
`;

const StyleButton = Styled.TouchableOpacity`
    padding: 8px;
`;


type NavigationProp = StackNavigationProp<MovieNaviParamList, 'MovieHome'>;
interface Props{
    navigation: NavigationProp;
}

const MovieHome = ({navigation}: Props) => {
    const {logout} = useContext<IUserContext>(UserContext);

    useLayoutEffect(()=> {
        navigation.setOptions({
            headerRight: () => (
                <StyleButton
                    onPress={() => {
                        logout();
                    }}>
                        <Icon source={require(`~/Assets/Images/ic_logout.png`)} />
                </StyleButton>
            ),
        });
    }, []);
    
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <Container>
            <BigCatalogueList
                url="http://yts.mx/api/v2/list_movies.json?sort_by=like_count&order_by=desc&limit=5"
                onPress={(id: number) => {
                    navigation.navigate('MovieDetail',{
                        id,
                    });
                }}
            />
            <SubCatalogueList
                title="평점순"
                url="https://yts.mx/api/v2/list_movies.json?sort_by=rating&order_by=desc&limit=10"
                onPress={(id: number) =>{
                    navigation.navigate('MovieDetail', {
                        id,
                    });
                }}
            />
            <SubCatalogueList
                title="다운로드순"
                url="https://yts.mx/api/v2/list_movies.json?sort_by=download_count&order_by=desc&limit=10"
                onPress={(id: number) =>{
                    navigation.navigate('MovieDetail', {
                        id,
                    });
                }}
            />
        </Container>
    );
};

export default MovieHome;