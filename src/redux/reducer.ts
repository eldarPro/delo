export default function rootReducer(state = [], { type, payload }: { type: string, payload: any }) : any {
    switch(type) {
        case 'SET_USER_STATE':
            return {
                ...state,
                userData: payload
            }
    }

    return state
}