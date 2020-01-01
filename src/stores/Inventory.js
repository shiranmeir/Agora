import { observable, action, computed } from 'mobx'
import { Item } from './Item'


export class Inventory {
    @observable items = [];

    @action addItem = (itemName) => {
        let item = this.items.find(i=> i.name === itemName)
        if (item){
            item.quantity++
        } else{
            this.items.push(new Item(itemName))
        }
    }

    @action buyItem = (itemName) => {
    let itemIndex = this.items.findIndex(i => i.name === itemName)
    if(this.items[itemIndex].quantity === 0){
        this.items.splice(itemIndex ,1)
    }else{
        this.items[itemIndex].quantity--
    }
    }
    @action changePrice = (itemName,newPrice) => {
        let itemIndex = this.items.findIndex(i => i.name === itemName)
        this.items[itemIndex].price=newPrice
    }
    @computed get numItems() {
        let numItems =  this.items.map(i => i.quantity)
        .reduce((a, b) => a + b, 0)
             return numItems
     }
}