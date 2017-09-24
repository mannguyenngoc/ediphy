import React, { Component } from 'react';
import { Jumbotron, Grid, Col, Row } from 'react-bootstrap';
import icon from '../img/ging.png';
import react from '../img/React-icon.svg';
import redux from '../img/Redux-icon.svg';
import git from '../img/Github-icon.svg';
import plugin from '../img/plugin.svg';

export default class Content extends Component {

    render() {
        return (
            <Grid className="bsGrid">
                <br/>
                <Jumbotron>
                    <img src={icon} className="mainLogo" alt=""/>
                    <h1>Dalí Editor</h1>
                    <h2>e-learning authoring tool</h2>
                </Jumbotron>
                <Row>
                    <Col xs={12} md={4} className="mainPageBlock">
                        <h3>Estructura basada en plugins</h3>
                        <img src={plugin} style={{ width: '40%' }} alt=""/>
                    </Col>
                    <Col xs={12} md={4} className="mainPageBlock">
                        <h3>Creado con React y Redux</h3>
                        <a href="https://facebook.github.io/react/">
                            <img src={react} style={{ width: '40%' }} alt=""/>
                        </a>
                        <a href="http://redux.js.org/docs/introduction/">
                            <img src={redux} style={{ width: '40%' }} alt=""/>
                        </a>
                    </Col>

                    <Col xs={12} md={4} className="mainPageBlock">
                        <h3>Visita el proyecto en GitHub</h3>
                        <a href="https://github.com/ging/dali_editor/">
                            <img src={git} style={{ width: '40%' }} alt=""/>
                        </a>
                    </Col>
                </Row>
            </Grid>
        );
    }
}
