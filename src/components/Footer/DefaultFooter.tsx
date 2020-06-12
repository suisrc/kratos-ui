import './index.less';

import React from 'react';
import classNames from 'classnames';

export interface GlobalFooterProps {
  links?: API.WithFalse<
    {
      key?: string;
      title: React.ReactNode;
      href: string;
      blankTarget?: boolean;
    }[]
  >;
  style?: React.CSSProperties;
  className?: string;
  copyright?: string;
  beian?: string;
}

export default ({
  className,
  links,
  copyright,
  style,
  beian,
}: GlobalFooterProps) => {
  if (
    (links == null ||
      links === false ||
      (Array.isArray(links) && links.length === 0)) &&
    copyright == null
  ) {
    return null;
  }
  const clsString = classNames('ant-pro-global-footer', className);
  return (
    <footer className={clsString} style={style}>
      {links && (
        <div className="ant-pro-global-footer-links">
          {links.map(link => (
            <a
              key={link.key}
              title={link.key}
              target={link.blankTarget ? '_blank' : '_self'}
              href={link.href}
            >
              {link.title}
            </a>
          ))}
        </div>
      )}
      {copyright && (
        <div className="ant-pro-global-footer-copyright">
          <span>{copyright}</span>
        </div>
      )}
      {beian && (
        <div className="ant-pro-global-footer-copyright">
          <a href="http://www.beian.miit.gov.cn">
            <img src="http://www.beian.gov.cn/img/new/gongan.png" />
            <span>{beian}</span>
          </a>
        </div>
      )}
    </footer>
  );
};
