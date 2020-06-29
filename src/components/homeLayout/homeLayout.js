import React, { Component } from 'react';
import { renderRoutes } from "react-router-config";
import './homeLayout.less'


class HomeLayout extends Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    UNSAFE_componentWillMount(){
        console.log(this.props.route.routes,'666')
    }
    
    render() {
        return (
            <div id='homeLayout'>
                
                <div className='content'>
                    {
                        renderRoutes(this.props.route.routes)
                    }
                </div>
            </div>
        );
    }
}

export default HomeLayout;