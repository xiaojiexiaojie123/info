export const setIsAuthenticated = ({ commit }, data) => {
  commit('setIsAuthenticated', data)
}

export const setUser = ({ commit }, data) => {
  commit('setUser', data)
}

export const setApply = ({ commit }, data) => {
  commit('setApply', data)
}

export const setLoading = ({ commit }, data) => {
  commit('setLoading', data)
}

export const clearCurrentState = ({commit}, data) => {
  commit('setIsAuthenticated', false)
  commit('setUser', null)
  commit('setApply', null)
}
