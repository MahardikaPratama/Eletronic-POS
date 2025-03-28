import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const BreadCrumb = ({ title }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <div>
            <div className="mb-4">
                <nav className="flex mb-5" aria-label="Breadcrumb">
                    <ol className="inline-flex items-center space-x-1 text-sm font-medium md:space-x-2">
                        <li className="inline-flex items-center">
                            <a href="/dashboard" className="inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white">
                                <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                Dashboard
                            </a>
                        </li>
                        {pathnames.slice(1).map((pathName, index) => {
                            const routeTo = `/${pathnames.slice(0, index + 2).join('/')}`;
                            const isLast = index === pathnames.slice(1).length - 1;

                            return (
                                <li key={pathName}>
                                    <div className="flex items-center">
                                        <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                                        {isLast ? (
                                            <span className="ml-1 text-gray-400 md:ml-2 dark:text-gray-500 capitalize">{pathName}</span>
                                        ) : (
                                            <a href={routeTo} className="ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white capitalize">
                                                {pathName}
                                            </a>
                                        )}
                                    </div>
                                </li>
                            );
                        })}
                    </ol>
                </nav>
                <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white capitalize">
                    {title}
                </h1>
            </div>
        </div>
    );
};

BreadCrumb.propTypes = {
    title: PropTypes.string.isRequired
};

export default BreadCrumb;