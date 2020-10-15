import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import styles from './article.module.css';
import { Article } from '../../../infra/types';
import { channelStore } from '../../stores';

export interface Props {
  articleList: Article[];
}

function renderList(props: Props): JSX.Element {
  const { articleList } = props;

  return (
    <ul className={styles.list}>
      {articleList.map((article: Article, i: number) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <li className={styles.item} key={article.title + i}>
            <div className={styles.title}>{article.title}</div>
            <div className={styles.meta}>
              <span className={styles.channel}>{article.channelTitle}</span>
              <span className={styles.pubTime}>{article.pubDate}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export const ArticleList = observer(
  (): JSX.Element => {
    const [articleList, setArticleList]: [Article[], any] = useState([]);

    useEffect(() => {
      channelStore
        .getArticleList('')
        .then((list) => {
          return setArticleList(list);
        })
        .catch((err) => {
          console.log(err);
        });
    });

    return (
      <div className={styles.container}>{renderList({ articleList })}</div>
    );
  }
);
