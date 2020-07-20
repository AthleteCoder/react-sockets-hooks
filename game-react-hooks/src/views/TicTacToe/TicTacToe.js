import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import useGameSocket from '../../hooks/useGameSocket';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { Paper, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { GameDesign } from './GameDesign/GameDesign';

export const TicTacToe = () => {
    const match = useRouteMatch();
    const [opps, gameData, myTurn, selectBox] = useGameSocket(match.params.id);
    const user = useSelector(user => user.userReducer);

    const handleBoxSelection = box => {
        selectBox(box);
    }

    return (
        <Grid container direction="row" justify="space-between" style={{ marginTop: "24px" }}>
            <Grid>
                <Chip
                    avatar={<Avatar>{user.email.charAt(0).toUpperCase()}</Avatar>}
                    label={user.email}
                    variant="outlined"
                />
            </Grid>
            <Grid>
                <Paper>
                    <GameDesign gameData={gameData} boxSelected={handleBoxSelection} />
                </Paper>
            </Grid>
            <Grid>
                {opps.map((opp, i) => <Chip key={i}
                    avatar={<Avatar>{opp.email.charAt(0).toUpperCase()}</Avatar>}
                    label={opp.email}
                    variant="outlined"
                />)}
            </Grid>

        </Grid>
    )
}
