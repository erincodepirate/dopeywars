import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Card, DataTable, Dialog, Provider, Text, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { newGame } from '../actions/DopeActions';
import { clearScores, newScore } from '../actions/ScoreActions';
import { RootState } from '../Interfaces';

enum endStatuses {
    in_debt = "The loan shark took everything from you.",
    millionaire = "You retired a millionaire.",
    poor = "You survived, but you barely broke even.",
    notpoor = "You made a little extra money, but not quite enough to retire."

}

function GameoverScreen(props: any) {
    const { dopeState, scoreState } = useSelector((state: RootState) => state);
    const dispatch = useDispatch();

    const finalCash = dopeState.cash + dopeState.bank - dopeState.loan;
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

    const clearScoresDialog = () =>
        setClearScoresVisible(true);

    const closeClearScoresDialog = () =>
        setClearScoresVisible(false);

    const newScoreDialog = () =>
        setNewScoreVisible(true);

    const closeNewScoreDialog = () =>
        setNewScoreVisible(false);

    useEffect(() => {
        let lowestScore = 0;
        if (scoreState.scores.length == 5) {
            lowestScore = scoreState.scores[scoreState.scores.length - 1].cash;
        }
        if (finalCash > lowestScore) {
            setNewScoreVisible(true);
        }
    }, []);

    const startNewGame = () => {
        dispatch(newGame());
        props.navigation.navigate('Jet');
    }

    return (
        <Provider>
            <View style={styles.container}>
                <Text style={styles.scoresTitle}>High Scores</Text>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Score</DataTable.Title>
                    </DataTable.Header>
                    <FlatList data={scoreState.scores} renderItem={({ item }) => {
                        return (
                            <DataTable.Row>
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
                <Card>
                    <Card.Content>
                        <View style={styles.finalCash}>
                            <Text style={styles.label}>Final cash: </Text>
                            <Text>${finalCash}</Text>
                        </View>
                        <Text>{'\n'}{status}</Text>
                    </Card.Content>
                    <Card.Actions>
                        <Button onPress={clearScoresDialog}>
                            Clear High Scores
                        </Button>
                        <Button onPress={startNewGame}>
                            Play Again
                        </Button>
                    </Card.Actions>
                </Card>

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
                            dispatch(newScore({ name: playerName, cash: finalCash }));
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
                            dispatch(clearScores());
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 350
    },
    label: {
        fontWeight: 'bold'
    },
    finalCash: {
        flexDirection: 'row'
    },
    scoresTitle: {
        fontSize:28,
        textAlign: 'center'
    }
});

export default GameoverScreen
