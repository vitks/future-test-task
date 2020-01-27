import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            // Объект ошибки в результате выполнении запроса
            error: null
        }

        // Объявление интерсепторов для отлова ошибок в запросах к серверу и ответах сервера
        UNSAFE_componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                    this.setState({ error: null });
                    return request;
                }
            );

            this.responseInterceptor = axios.interceptors.response.use(response => response, error => {
                    this.setState({ error: error });
                }
            );
        }

        // Снятие интерсептора при удалении компонента со страницы (для оптимизации работы,
        // чтобы не затрачивать лишние ресурсы ради несуществующих компонентов)
        componentWillUnmount() {
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        // Подтверждение уведомления об ошибке (закрытие модального окна)
        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        // Рендер ошибки поверх
        render () {
            return (
                <div>
                    <Modal
                        show={ this.state.error }
                        modalClose={ this.errorConfirmedHandler }>
                            { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent { ...this.props } />
                </div>
            );
        }
    }
}

export default withErrorHandler;