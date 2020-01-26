import React, { Component } from 'react';

import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';
import Pagination from '../UI/Pagination/Pagination';

import classes from './Table.module.css';

class Table extends Component {
    state = {
        currentPage: 1,
        pagesNumber: null
    }

    componentDidMount() {
       let newPagesNumber = this.props.body.length / this.props.maxRowsNumber;

       if (newPagesNumber - Math.trunc(newPagesNumber) > 0) newPagesNumber = Math.trunc(newPagesNumber) + 1;

       this.setState({ pagesNumber: newPagesNumber });
    }

    paginationHandler = (value) => {
        const { currentPage, pagesNumber } = this.state;
        let newCurrentPage = currentPage;

        switch (value) {
            case ('increment'):
                newCurrentPage += 1;
                break;
            case ('decrement'):
                newCurrentPage -= 1;
                break;
            default:
                newCurrentPage = value;
        }

        if ((newCurrentPage >= 1) && (newCurrentPage <= pagesNumber) && (newCurrentPage !== currentPage)) {
            this.setState({ currentPage: newCurrentPage });
        }
    }

    render() {
        const startOfPage = this.props.maxRowsNumber * this.state.currentPage - this.props.maxRowsNumber;
        let endOfPage = startOfPage + this.props.maxRowsNumber;
        let newBody = [];

        if (endOfPage > this.props.body.length) {
            endOfPage = this.props.body.length;
        }

        for (let i = startOfPage; i < endOfPage; i++) {
            newBody.push(this.props.body[i]);
        }

        return(
            <div>
                { this.state.pagesNumber ?
                    <div>
                        <table className={ classes.Table }>
                            <TableHead columnHeads={ this.props.head } />
                            <TableBody
                                rows={ newBody }
                                columns={ this.props.head }
                                rowClicked={ this.props.tableRowClicked } />
                        </table>
                        <Pagination 
                            currentPage={ this.state.currentPage }
                            pagesNumber={ this.state.pagesNumber }
                            clicked={ this.paginationHandler } />
                    </div>
                    : null }
            </div>
        );
    }
}

export default Table;