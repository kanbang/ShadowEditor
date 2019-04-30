import BaseComponent from './BaseComponent';
import Button from './component/Button';

const ComponentTypes = {
    Button,
};

/**
 * 数据可视化
 * @author tengge / https://github.com/tengge1
 */
function Visualization() {
    BaseComponent.call(this);
    this.components = [];
}

Visualization.prototype = Object.create(BaseComponent.prototype);
Visualization.prototype.constructor = Visualization;

/**
 * 添加一个组件
 * @param {BaseComponent} component 可视化组件
 */
Visualization.prototype.add = function (component) {
    if (!(component instanceof BaseComponent)) {
        console.warn(`Visualization: component is not an instance of BaseComponent.`);
        return;
    }
    if (this.components.indexOf(component) > -1) {
        console.warn(`Visualization: component has already added to the list.`);
        return;
    }

    this.components.push(component);
};

/**
 * 移除一个组件
 * @param {BaseComponent} component 可视化组件
 */
Visualization.prototype.remove = function (component) {
    if (!(component instanceof BaseComponent)) {
        console.warn(`Visualization: component is not an instance of BaseComponent.`);
        return;
    }

    var index = this.components.indexOf(component);

    if (index === -1) {
        console.warn(`Visualization: component does not exist in the list.`);
        return;
    }

    this.components.splice(index, 1);
};

/**
 * 将所有控件渲染到svgDom里面
 * @param {SVGSVGElement} svgDom SVG元素
 */
Visualization.prototype.render = function (svgDom) {
    if (!(svgDom instanceof SVGSVGElement)) {
        console.warn(`Visualization: svgDom is not an instance of SVGSVGElement.`);
        return;
    }

    this.components.forEach(n => {
        n.render(svgDom);
    });
};

/**
 * svg控件转json
 */
Visualization.prototype.toJSON = function () {
    var list = [];

    this.components.forEach(n => {
        var jsons = n.toJSON();

        if (Array.isArray(jsons)) {
            list.push.apply(list, jsons);
        } else if (jsons) {
            list.push(jsons);
        } else {
            console.warn(`Visualization: ${n.id}.toJSON() result in null.`);
        }
    });

    return list;
};

/**
 * json转svg控件
 * @param {Object} jsons JSON字符串序列后的对象
 */
Visualization.prototype.fromJSON = function (jsons) {
    if (!Array.isArray(jsons)) {
        console.warn(`Visualization: jsons is not an Array.`);
        return;
    }

    this.dispose();

    jsons.forEach(n => {
        var ctype = ComponentTypes[n.type];
        if (ctype) {
            var component = new ctype();
            component.fromJSON(n);
            this.add(component);
        } else {
            console.warn(`Visualization: there is no ComponentType named ${n.type}.`);
        }
    });
};

/**
 * 清空组件
 */
Visualization.prototype.dispose = function () {
    this.components.forEach(n => {
        n.dispose();
    });
    this.components.length = 0;
};

export default Visualization;