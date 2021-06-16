import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { observer } from 'mobx-react';
import Dayjs from 'dayjs';
import { StoreContext, StoreType } from '../../stores';
import { Article } from '../../../infra/types';
import { ArticleReadStatus } from '../../../infra/constants/status';
import { Toolbar } from './Toolbar';

import styles from './article.module.css';

export const ArticleList = observer(
  (): JSX.Element => {
    const [articleList, setArticleList] = useState<Article[]>([]);
    const [currentLink, setCurrentLink] = useState<string>('');
    const articleListRef = useRef<HTMLDivElement>(null);
    const { channelStore, articleStore } = useContext(
      StoreContext
    ) as StoreType;
    const { currentChannel, type } = channelStore;

    const viewDetail = useCallback(
      async (article: Article) => {
        await articleStore.markArticleAsRead(article.id);
        articleStore.setCurrentView(article);

        channelStore.decreaseUnreadCountInChannel(article.channelId, 1);

        setCurrentLink(article.link);
        article.hasRead = ArticleReadStatus.isRead;
      },
      [articleStore, channelStore]
    );

    const resetScrollTop = () => {
      if (articleListRef.current !== null) {
        articleListRef.current.scroll(0, 0);
      }
    };

    const renderList = useCallback((): JSX.Element => {
      return (
        <ul className={styles.list}>
          {articleList.map((article: Article, i: number) => {
            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={article.title + i}
                className={`${styles.item} ${
                  article.hasRead === ArticleReadStatus.isRead && styles.read
                } ${article.link === currentLink && styles.current}`}
                onClick={() => viewDetail(article)}
                aria-hidden="true"
              >
                <div className={styles.title}>{article.title}</div>
                <div className={styles.meta}>
                  <span className={styles.channel}>{article.channelTitle}</span>
                  <span className={styles.pubTime}>
                    {Dayjs(article.pubDate).format('YYYY-MM-DD HH:mm')}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      );
    }, [articleList, currentLink, viewDetail]);

    useEffect(() => {
      let promise = null;

      if (type === 'all') {
        promise = articleStore.getAllUnread();
      } else {
        promise = articleStore.getListWithChannelId(currentChannel.id);
      }

      promise
        .then((list) => {
          setArticleList(list);

          return list;
        })
        .catch((err) => {
          console.log(err);
        });

      resetScrollTop();
    }, [type, currentChannel, articleStore]);

    return (
      <div className={styles.container} ref={articleListRef}>
        {currentChannel.title && <Toolbar channelName={currentChannel.title} />}
        {renderList()}
      </div>
    );
  }
);