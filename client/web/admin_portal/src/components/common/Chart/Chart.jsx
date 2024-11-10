import React from 'react';
import {
    LineChart,
    BarChart,
    PieChart,
    AreaChart,
    RadarChart,
    ScatterChart,
    ComposedChart,
    Line,
    Bar,
    Area,
    Pie,
    Radar,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
    ResponsiveContainer,
    Cell,
    RadarPolarGrid,
    RadarPolarAngleAxis,
    RadarPolarRadiusAxis,
} from 'recharts';
import PropTypes from 'prop-types';
import './Chart.css';

const Chart = ({
                         chartType,
                         data,
                         width = "100%",
                         height = 300,
                         xKey,
                         yKey,
                         title,
                         colors,
                         innerRadius = 0,
                         outerRadius = '80%',
                         isResponsive = true,
                         additionalDataKeys = []
                     }) => {


    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey={yKey} stroke={colors ? colors[0] : '#8884d8'} />
                    </LineChart>
                );
            case 'bar':
                return (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={yKey}>
                            {colors && colors.map((color, index) => (
                                <Cell key={index} fill={color} />
                            ))}
                        </Bar>
                    </BarChart>
                );
            case 'pie':
                return (
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey={yKey}
                            nameKey={xKey}
                            cx="50%"
                            cy="50%"
                            innerRadius={innerRadius}
                            outerRadius={outerRadius}
                            fill={colors ? colors[0] : '#8884d8'}
                            label
                        >
                            {data.map((entry, index) => (
                                <Cell key={index} fill={colors ? colors[index % colors.length] : '#8884d8'} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                );
            case 'area':
                return (
                    <AreaChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey={yKey} fill={colors ? colors[0] : '#8884d8'} stroke={colors ? colors[0] : '#8884d8'} />
                    </AreaChart>
                );
            case 'radar':
                return (
                    <RadarChart outerRadius="80%" data={data}>
                        <RadarPolarGrid />
                        <RadarPolarAngleAxis dataKey={xKey} />
                        <RadarPolarRadiusAxis />
                        <Tooltip />
                        <Radar name={xKey} dataKey={yKey} stroke={colors ? colors[0] : '#8884d8'} fill={colors ? colors[0] : '#8884d8'} />
                    </RadarChart>
                );
            case 'scatter':
                return (
                    <ScatterChart>
                        <CartesianGrid />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Scatter data={data} fill={colors ? colors[0] : '#8884d8'} />
                    </ScatterChart>
                );
            case 'composed':
                return (
                    <ComposedChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey={xKey} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {additionalDataKeys.map((key, index) => (
                            <React.Fragment key={index}>
                                <Line type="monotone" dataKey={key} stroke={colors ? colors[index] : '#8884d8'} />
                                <Bar dataKey={key} fill={colors ? colors[index] : '#82ca9d'} />
                            </React.Fragment>
                        ))}
                    </ComposedChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className="chart-container">
            {title && <h3>{title}</h3>}
            <ResponsiveContainer width={isResponsive ? "100%" : width} height={height}>
                {renderChart()}
            </ResponsiveContainer>
        </div>
    );
};


Chart.propTypes = {
    chartType: PropTypes.oneOf(['line', 'bar', 'pie', 'area', 'radar', 'scatter', 'composed']).isRequired,
    data: PropTypes.array.isRequired,
    width: PropTypes.string,
    height: PropTypes.number,
    xKey: PropTypes.string.isRequired,
    yKey: PropTypes.string.isRequired,
    title: PropTypes.string,
    colors: PropTypes.array,
    innerRadius: PropTypes.number,
    outerRadius: PropTypes.string,
    isResponsive: PropTypes.bool,
    additionalDataKeys: PropTypes.array,
};

export default Chart;
