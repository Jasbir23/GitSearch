import { observable, action } from 'mobx';

class MainStore {
  @observable allUsers = [];
  @observable filteredUsers = [];
  @observable isWaiting = true;
  async setAllUsers() { 
      let response = await fetch(`https://api.github.com/users?since=0`);
      response = await response.json();
        this.allUsers = response;
        this.isWaiting = false;
      this.isWaiting = false;
   }
   async setSearchResults(txt){
       let response = await fetch(`https://api.github.com/search/users?q=${txt}`);
       response = await response.json();
        this.filteredUsers = response;
        this.isWaiting = false;
   }
   setIsWaiting(status){
       this.isWaiting = status;
   }
}

export default new MainStore();