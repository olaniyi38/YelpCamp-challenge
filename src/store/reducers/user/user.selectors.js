export const selectCurrentUser = (state) => state.user.currentUser

export const selectUserIsLoading = state => state.user.isLoading

export const selectDisplayName = state => state.user.currentUser.displayName