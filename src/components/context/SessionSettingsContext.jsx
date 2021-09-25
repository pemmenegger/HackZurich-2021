import React, { createContext } from 'react';
import { handleAlreadyLoggedInFirebaseUser, mapFirebaseUserToRigiUser, mapAllFirebaseUsersToAllRigiUsers } from "../../services/rigiUserService"

export const SessionSettingsContext = createContext();

export const withSessionSettingsContext = WrappedComponent => props => (
    <SessionSettingsContext.Consumer>
        {value => <WrappedComponent {...props} SessionSettingsContext={value}/>}
    </SessionSettingsContext.Consumer>
);

export class RigiUserProvider extends React.Component {

  constructor() {
    super();
    this.state = {
      rigiUser: null,
      allRigiUsers: null,
      isLoading: false,
      updateRigiUser: (firebaseUser) => {
        this.setRigiUser(firebaseUser)
      }, 
    };

    this.setIsLoading = this.setIsLoading.bind(this);
    this.updateRigiUser = this.setRigiUser.bind(this);
  }

  componentDidMount() {
    this.fetchAlreadyLoggedInRigiUser()
  }

  fetchAlreadyLoggedInRigiUser() {
    this.setIsLoading(true)
    let onSuccessCallback = async (firebaseUser) => {await this.setRigiUser(firebaseUser)}
    let hasFinishedCallback = () => {this.setIsLoading(false)}
    handleAlreadyLoggedInFirebaseUser(onSuccessCallback, hasFinishedCallback);
  };

  async setRigiUser(firebaseUser) {
    let isValidFirebaseUser = firebaseUser && firebaseUser.uid

    // logout
    if(!isValidFirebaseUser) {
      this.setState({ 
        rigiUser: null,
        allRigiUsers: null
      });
      return
    }

    // login
    let rigiUser = {}
    let allRigiUsers = []
    await Promise.all([
      // will be executed in parallel
      mapFirebaseUserToRigiUser(firebaseUser, rigiUser), 
      mapAllFirebaseUsersToAllRigiUsers(allRigiUsers)
    ]);
    this.setState({ 
      rigiUser: rigiUser,
      allRigiUsers: allRigiUsers
    });
  }

  setIsLoading(isLoading) {
    this.setState({ isLoading: isLoading})
  }

  render() {
    const { children } = this.props;
    return (
      // This provider will wrap the rest of the tree and we pass in the user in the 
      // state and the updateRigiUser function as well. 
      <SessionSettingsContext.Provider value={this.state}>
        {children}
      </SessionSettingsContext.Provider>
    );
  }
}