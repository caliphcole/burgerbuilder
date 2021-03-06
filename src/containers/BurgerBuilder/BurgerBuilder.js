import React, {Component} from 'react';
import Aux from '../../hoc/Auxs';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad:0.5,
    cheese:0.4,
    meat: 1.3,
    bacon:0.6
}

class BurgerBuilder extends Component{
    state ={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }

    updatePurchaseState(updateIngredients){
        const ingredients ={
            ...updateIngredients
        }

        const sum = Object.keys(ingredients).map(igKey=>{
            return ingredients[igKey];
        }
            ).reduce((sum,el)=>{
                console.log(sum, el);
                return sum +el;
            }, 0);
            this.setState({purchasable:sum >0})
    }
    addIngredientHandler = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount= oldCount +1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceAddiction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddiction;
        this.setState({
            totalPrice:newPrice, ingredients:updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler=()=>{

        this.setState({purchasing:true});
    }
    removeIngredientHandler =(type)=>{
        const oldCount = this.state.ingredients[type];

        if(oldCount <=0){
            return;
        }
        const updatedCount= oldCount -1;
        const updateIngredients = {
            ...this.state.ingredients
        };
        updateIngredients[type] = updatedCount;
        const priceAddiction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddiction;
        this.setState({
            totalPrice:newPrice, ingredients:updateIngredients
        });
        this.updatePurchaseState(updateIngredients);
    }
    purchaseCancelHandler = () =>{
        this.setState({purchasing:false});
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] =disabledInfo[key]<=0
        }

    
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}><OrderSummary ingredients={this.state.ingredients}/></Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded ={this.addIngredientHandler} ingredientRemoved = {this.removeIngredientHandler}
                purchasable = {this.state.purchasable}
                ordered = {this.purchaseHandler}
                disabled={disabledInfo} price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;