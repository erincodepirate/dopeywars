import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, DataTable, Dialog, Provider, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import { newGame } from '../actions/DopeActions';
import { HighScore, RootState } from '../Interfaces';
import { newGameCity } from '../actions/CityActions';

enum endStatuses {
    in_debt = "The loan shark took everything from you.",
    millionaire = "You retired a millionaire.",
    poor = "You survived, but you barely broke even.",
    notpoor = "You made a little extra money, but not quite enough to retire."

}

function GameoverScreen(props: any) {
    const cash = useSelector((state: RootState) => state.dopeState.cash);
    const loan = useSelector((state: RootState) => state.dopeState.loan);
    const bank = useSelector((state: RootState) => state.dopeState.bank);
    const dispatch = useDispatch();

    const finalCash = cash + bank - loan;
    let status = endStatuses.in_debt;
    if (finalCash > 0) {
        status = endStatuses.poor
    }
    if (finalCash > 10000) {
        status = endStatuses.notpoor
    }
    if (finalCash > 1000000) {
        status = endStatuses.millionaire;
    }

    const [newScoreVisible, setNewScoreVisible] = React.useState(false);
    const [clearScoresVisible, setClearScoresVisible] = React.useState(false);
    const [playerName, setPlayerName] = React.useState('');
    const [highScores, setHighScores] = React.useState<HighScore[]>([]);

    const clearScoresDialog = () =>
        setClearScoresVisible(true);

    const closeClearScoresDialog = () =>
        setClearScoresVisible(false);

    const newScoreDialog = () =>
        setNewScoreVisible(true);

    const closeNewScoreDialog = () =>
        setNewScoreVisible(false);

    const scoreStorageKey = '@dopey_scores'

    const getScores = async () => {
        const s = await AsyncStorage.getItem(scoreStorageKey);
        if (s) {
            let parsedScores = JSON.parse(s);
            if (Array.isArray(parsedScores)) {
                setHighScores(parsedScores);
            }
        }
    }

    const saveScores = async (scores: HighScore[]) => {
        setHighScores(scores);
        AsyncStorage.setItem(scoreStorageKey, JSON.stringify(scores));
    }

    const setNewScore = (name: String) => {
        let newScore = { name: name, cash: finalCash };
        let scores = highScores;
        scores.push(newScore);
        scores = _.orderBy(scores, "cash", "desc");
        if (scores.length > 5) {
            scores.pop();
        }
        setHighScores(scores);
        saveScores(scores);
    }

    useEffect(() => {
        getScores().then(() => {
            let lowestScore = 0;
            if (highScores.length == 5) {
                lowestScore = highScores[highScores.length - 1].cash;
            }
            if (finalCash > lowestScore) {
                newScoreDialog();
            }
        });
    }, []);

    const startNewGame = () => {
        dispatch(newGame());
        dispatch(newGameCity());
        props.navigation.navigate('Jet');
    }

    const windowDimensions = Dimensions.get('window');
    const screenDimensions = Dimensions.get('screen');


    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({ window, screen }) => {
                setDimensions({ window, screen });
            },
        );
        return () => subscription?.remove();
    });
    const { height, width } = dimensions.window;

    const styles = StyleSheet.create({
        container: {
            alignItems: 'center',
            justifyContent: 'center',
            width: width,
            height: height,
            flexWrap: 'wrap',
            flexDirection: 'row'
        },
        highScores: {
            width: "100%"
        },
        label: {
            fontWeight: 'bold'
        },
        finalCash: {
            flexDirection: 'row'
        },
        scoresTitle: {
            fontSize: 28,
            textAlign: 'center'
        },
        scoreCard: {
            width: "100%"
        },
        row: {
            minHeight: 42
        },
        scores: {
            width: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row'
        }
    });

    if (height < width && highScores.length > 0) {
        styles.highScores.width = "50%";
        styles.scoreCard.width = "50%";
    }

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.scores}>
                    {highScores.length > 0 && (<View style={styles.highScores}>
                        <Text style={styles.scoresTitle}>High Scores</Text>
                        <DataTable>
                            <DataTable.Header style={styles.row}>
                                <DataTable.Title>Name</DataTable.Title>
                                <DataTable.Title>Score</DataTable.Title>
                            </DataTable.Header>
                            <FlatList data={highScores} renderItem={({ item }) => {
                                return (
                                    <DataTable.Row style={styles.row}>
                                        <DataTable.Cell>
                                            {item.name}
                                        </DataTable.Cell>
                                        <DataTable.Cell>
                                            ${item.cash}
                                        </DataTable.Cell>
                                    </DataTable.Row>
                                )
                            }}
                            />
                        </DataTable>
                    </View>)}
                    <Card style={styles.scoreCard}>
                        <Card.Content>
                            <View style={styles.finalCash}>
                                <Text style={styles.label}>Final cash: </Text>
                                <Text>${finalCash}</Text>
                            </View>
                            <Text>{'\n'}{status}</Text>
                        </Card.Content>
                        <Card.Actions>
                            {highScores.length > 0 &&
                                <Button onPress={clearScoresDialog}>
                                    Clear High Scores
                                </Button>
                            }
                            <Button onPress={startNewGame}>
                                Play Again
                            </Button>
                        </Card.Actions>
                    </Card>
                </View>

                <Dialog
                    visible={newScoreVisible}
                    dismissable={false}>
                    <Dialog.Title>New High Score</Dialog.Title>
                    <Dialog.Content>
                        <Text>Congratulations, you have achieved a new high score!</Text>
                        <TextInput
                            value={playerName}
                            onChangeText={setPlayerName} />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            setNewScore(playerName);
                            closeNewScoreDialog();
                        }}>
                            Ok
                        </Button>
                    </Dialog.Actions>
                </Dialog>
                <Dialog
                    visible={clearScoresVisible}
                    onDismiss={closeClearScoresDialog}>
                    <Dialog.Title>Clear High Scores</Dialog.Title>
                    <Dialog.Content>
                        <Text>Are you sure you want to clear the high scores?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            saveScores([]);
                            closeClearScoresDialog();
                        }}>
                            Yes
                        </Button>
                        <Button onPress={closeClearScoresDialog}>
                            No
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </View>
        </Provider>
    )
}



export default GameoverScreen
