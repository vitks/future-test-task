import React, { Component } from 'react';

import TableHead from '../../components/TableHead/TableHead';
import TableBody from '../../components/TableBody/TableBody';
import Pagination from '../../components/UI/Pagination/Pagination';

import classes from './Table.module.css';

class Table extends Component {
    state = {
        // Параметры, необходимые для пагинации
        currentPage: null,
        pagesNumber: null,
        previousLength: null
    }

    componentDidMount() {
        this.setPagination();
    }

    // Обновление параметров пагинации в случае изменения размера таблицы
    componentDidUpdate() {
        if (this.state.previousLength !== this.props.structure.tableBody.length) {
            this.setPagination();
        }
    }

    // Установка параметров пагинации
    setPagination = () => {
        let newPagesNumber = this.props.structure.tableBody.length / this.props.maxRowsNumber;
        
        if (newPagesNumber - Math.trunc(newPagesNumber) > 0) newPagesNumber = Math.trunc(newPagesNumber) + 1;
        
        this.setState({ pagesNumber: newPagesNumber, currentPage: 1, previousLength: this.props.structure.tableBody.length });
    }

    // Обработка нажатия на элемент пагинации
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
        const { currentPage, pagesNumber } = this.state;
        const { structure, maxRowsNumber, tableRowClicked } = this.props;
        const startOfPage = maxRowsNumber * currentPage - maxRowsNumber;
        let endOfPage = startOfPage + maxRowsNumber;
        let paginatedBody = [];

        // Вычисление индекса последнего элемента тела таблицы для данной страницы
        if (endOfPage > structure.tableBody.length) {
            endOfPage = structure.tableBody.length;
        }

        // Составление массива данных для тела таблицы
        for (let i = startOfPage; i < endOfPage; i++) {
            paginatedBody.push(structure.tableBody[i]);
        }

        // Рендер таблицы
        return(
            <div>
                { pagesNumber ?
                    <div>
                        <table className={ classes.Table }>
                            <TableHead
                                columnHeads={ structure.tableHead } />
                            <TableBody
                                rows={ paginatedBody }
                                columns={ structure.tableHead }
                                rowClicked={ tableRowClicked } />
                        </table>
                        <Pagination 
                            currentPage={ currentPage }
                            pagesNumber={ pagesNumber }
                            clicked={ this.paginationHandler } />
                    </div>
                    : null }
            </div>
        );
    }
}

export default Table;