import './css/ESideBar.css';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';

import TabLayout from '../layout/TabLayout.jsx';
import VBoxLayout from '../layout/VBoxLayout.jsx';

import HierarchyPanel from './sidebar/HierarchyPanel.jsx';
import HistoryPanel from './sidebar/HistoryPanel.jsx';
import PropertyPanel from './sidebar/PropertyPanel.jsx';
import AnimationPanel from './sidebar/AnimationPanel.jsx';

/**
 * 侧边栏
 * @author tengge / https://github.com/tengge1
 * @property {String} className 样式类
 */
class ESideBar extends React.Component {
    render() {
        const { className, split, ...others } = this.props;

        return <VBoxLayout className={classNames('ESideBar', className)} {...others}>
            <TabLayout className={'top'}>
                <HierarchyPanel title={'Hierarchy'} />
                <HistoryPanel title={'History'}></HistoryPanel>
            </TabLayout>
            <TabLayout className={'bottom'}>
                <PropertyPanel title={'Property'}></PropertyPanel>
                <AnimationPanel title={'Animation'}></AnimationPanel>
            </TabLayout>
        </VBoxLayout>;
    }
}

ESideBar.propTypes = {
    className: PropTypes.string,
};

export default ESideBar;