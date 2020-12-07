/* OPERATIONS = REDUX THUNKS

This file defines the public interface of the duck -- what can be dispatched from components
Simple operations are just about forwarding an action creator, ex: simpleQuack
Complex operations involve returning a thunk that dispatches multiple actions in a certain order, ex: complexQuack

*/

import { quack, swim } from "./actions";

/*const simpleQuack = actions.quack;

const complexQuack = ( distance ) => ( dispatch ) => {
    dispatch( actions.quack( ) ).then( ( ) => {
        dispatch( actions.swim( distance ) );
    } );
}*/

const complexQuack = ( distance ) => ( dispatch ) => {
    dispatch( quack())
	dispatch( swim(distance))
}

export {
    quack,
    swim,
	complexQuack
};
