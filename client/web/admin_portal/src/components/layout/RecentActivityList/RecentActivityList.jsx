import React from 'react';
import { Card, List, Avatar, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './RecentActivityList.css';

const { Text } = Typography;

const RecentActivityList = ({ activities }) => {
    return (
        <Card title="Recent Activities" className="activity-list-card">
            <List
                itemLayout="horizontal"
                dataSource={activities}
                renderItem={(activity) => (
                    <List.Item className="activity-item">
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    icon={<ClockCircleOutlined />}
                                    style={{ backgroundColor: '#1890ff' }}
                                />
                            }
                            title={<Text strong>{activity.title}</Text>}
                            description={
                                <>
                                    <Text type="secondary">{activity.timestamp}</Text>
                                    <br />
                                    <Text>{activity.description}</Text>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

RecentActivityList.propTypes = {
    activities: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default RecentActivityList;
