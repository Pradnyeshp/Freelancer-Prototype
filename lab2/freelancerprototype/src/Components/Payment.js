import React, { Component } from 'react';
import './userhome.css'

class Payment extends Component {
    render() {
        return (

            <div className="payment">
                <h2>Payment Page</h2>
                <div className='payment1'>
                <div className='container-fluid'>
                <div class="row">
                <div class="col-md-6 order-md-6">
                <form class="needs-validation" novalidate="">
                    <hr class="mb-4"/>
                            <h4 class="mb-3">Payment</h4>
                                <div class="col-md-12 mb-3">
                                    <label for="cc-name">Name on card</label>
                                    <input type="text" class="form-control" id="cc-name" placeholder="" required=""/>
                                        <small class="text-muted">Full name as displayed on card</small>
                                        <div class="invalid-feedback">
                                            Name on card is required
                                        </div>
                                </div>
                                <div class="col-md-12 mb-3">
                                    <label for="cc-number">Credit card number</label>
                                    <input type="text" class="form-control" id="cc-number" placeholder="" required=""/>
                                        <div class="invalid-feedback">
                                            Credit card number is required
                                        </div>
                                </div>

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="cc-expiration">Expiration Month</label>
                                    <input  type="text" class="form-control" id="cc-expiration" placeholder="MM" required=""/>
                                        <div class="invalid-feedback">
                                            Expiration date required
                                        </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="cc-expiration">Expiration Year</label>
                                    <input  type="text" class="form-control" id="cc-expiration" placeholder="YY" required=""/>
                                    <div class="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>
                                <div class="col-md-4 mb-3">
                                    <label for="cc-expiration">CVV</label>
                                    <input type="text" class="form-control" id="cc-cvv" placeholder="" required=""/>
                                        <div class="invalid-feedback">
                                            Security code required
                                        </div>
                                </div>
                            </div>
                            <hr class="mb-4"/>
                                <button class="btn btn-primary btn-lg btn-block" type="submit">Continue to checkout</button>
                </form>
                </div>
                </div>
                </div>
                </div>
            </div>
        );
    }
}

export default Payment;
