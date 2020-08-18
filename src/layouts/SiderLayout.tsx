import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useIntl, IRouteComponentProps, NavLink, useModel, IRoute } from 'umi';
import { Drawer, Menu, Button, Input, Divider, Row, Col, Space } from 'antd';
import {
  LeftOutlined,
  SearchOutlined,
  SettingOutlined,
  DeleteOutlined,
  DragOutlined,
  CloseOutlined,
  MenuOutlined,
} from '@ant-design/icons';

import Draggable, { DraggableCore } from 'react-draggable';

import BasicLayout from './BasicLayout';
import SearchMenu, { filterByMenuDate } from './SearchMenu';

// import SiderMenu from '@ant-design/pro-layout/lib/SiderMenu';
// import SiderDrawer from '@/components/SiderDrawer';

import './layouts.less';
import menu from '@/locales/en-US/menu';

const Layout = (props: IRouteComponentProps) => {
  const i18n = useIntl();
  const [showUsr, setShowUsr] = useState<boolean>(true); // 一级收藏目录
  const [showAll, setShowAll] = useState<boolean>(false); // 二级全目录
  const [keyword, setKeyword] = useState(''); // 菜单搜索

  const menuUsr = [
    {
      id: '1',
      title: '配置1',
      draggable: false,
    },
    {
      id: '2',
      title: '配置2',
      draggable: false,
    },
    {
      id: '3',
      title: '配置3',
      draggable: false,
    },
    {
      id: '4',
      title: '配置4',
      draggable: false,
    },
    {
      id: '5',
      title: '配置5',
      draggable: false,
    },
  ];
  // <LeftOutlined style={{float: 'left', opacity: 0.7, paddingTop: 5}}/>
  return (
    <>
      <BasicLayout {...props} onClickLogo={_ => setShowUsr(!showUsr)} />
      <Drawer
        key="menu-user"
        placement="right"
        title={
          <Button
            type="text"
            block
            icon={<LeftOutlined />}
            style={{ height: 48, textAlign: 'left' }}
            onClick={_ => setShowAll(!showAll)}
          >
            all service
          </Button>
        }
        headerStyle={{ padding: 0 }}
        style={{ paddingTop: 48 }}
        width={240}
        zIndex={7}
        visible={showUsr}
        closable={false}
        mask={!showAll}
        onClose={_ => setShowUsr(false)}
        bodyStyle={{ padding: 10 }}
      >
        {menuUsr.map((val, idx) => (
          <Draggable
            key={idx}
            //axis={val.draggable ? "y" : "none"}
            axis={'y'}
            grid={[0, 40]}
            bounds={{ top: 0, bottom: 40 * (menuUsr.length - 1) }}
            // defaultPosition={{x: 0, y: idx * 40}}
            // positionOffset={{x: 0, y: 40}}
            onStart={(_, d) => console.log(d)}
            onDrag={(_, d) => console.log(d)}
            onStop={(_, d) => console.log(d)}
          >
            <Button
              type="text"
              block
              icon={<SettingOutlined />}
              className="ant-pro-custom-menu-drawer-button"
            >
              {val.title}
              {idx}
              <Space className="ant-pro-custom-menu-drawer-button-right">
                <CloseOutlined />
                <MenuOutlined
                  onMouseDown={_ => (val.draggable = true)}
                  onMouseUp={_ => (val.draggable = false)}
                  className="ant-pro-custom-menu-drawer-button-drag"
                />
              </Space>
            </Button>
          </Draggable>
        ))}
      </Drawer>
      <Drawer
        key="menu-all"
        placement="right"
        title={
          <Input
            bordered={false}
            allowClear
            prefix={<SearchOutlined />}
            style={{ borderBottom: '1px solid', width: 360 }}
            // style={{ borderBottom: '1px solid #dbdbdb', width: 360 }}
          />
        }
        style={{ paddingTop: 48, right: showAll ? 240 : 0 }}
        width={480}
        zIndex={5}
        visible={showAll}
        closable={true}
        onClose={e => {
          if (e.target['className'] === 'ant-drawer-mask') {
            setShowUsr(false);
            setShowAll(false);
          } else {
            setShowAll(false);
          }
        }}
        bodyStyle={{ padding: 10 }}
      >
        <Row style={{ left: 120 }}>
          <Col span={12}>
            <div>分组1</div>
            <Button
              key="k11"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k12"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k13"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
          </Col>
          <Col span={12}>
            <div>分组2</div>
            <Button
              key="k21"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k22"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k23"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k24"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
          </Col>
          <Col span={12}>
            <div>分组3</div>
            <Button
              key="k31"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k32"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k33"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k34"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
          </Col>
          <Col span={12}>
            <div>分组4</div>
            <Button
              key="k41"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k42"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k43"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
            <Button
              key="k44"
              type="text"
              block
              icon={<SettingOutlined />}
              style={{ textAlign: 'left' }}
            >
              配置4
            </Button>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default Layout;
