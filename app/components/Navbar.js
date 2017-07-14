/**
 * Created by kieranderfus on 7/14/17.
 */
import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <div>
            <div>
                <NavLink to={`/campuses`} activeClassName="active"><span>Campuses</span></NavLink>
            </div>
            <div>
                <NavLink to={`/students`} activeClassName="active"><span>Students</span></NavLink>
            </div>
        </div>
    )
}