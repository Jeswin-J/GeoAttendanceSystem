import React from 'react';
import PropTypes from 'prop-types';
import './GridLayout.css';

const GridLayout = ({
                        columns = 3,
                        columnSizes,
                        gap = '1rem',
                        alignItems = 'start',
                        children,
                    }) => {
    const gridStyles = {
        display: 'grid',
        gridTemplateColumns: columnSizes
            ? Array.isArray(columnSizes) ? columnSizes.join(' ') : columnSizes
            : `repeat(${columns}, 1fr)`,
        gap,
        alignItems,
    };

    return <div style={gridStyles} className="grid-layout">{children}</div>;
};

GridLayout.propTypes = {
    columns: PropTypes.number,
    columnSizes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    gap: PropTypes.string,
    alignItems: PropTypes.oneOf(['start', 'center', 'end']),
    children: PropTypes.node.isRequired,
};

export default GridLayout;
