import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  createRef
} from "react";
import { useBearStore } from "@/hooks/useBearStore";
import { ArticleListProps } from "@/components/ArticleList/index";
import { ArticleLineItem } from "@/components/ArticleItem/Line";
import { useArticleListHook } from "@/components/ArticleList/hooks";

export const ArticleLineList = (props: ArticleListProps): JSX.Element => {
  const { feedUuid } = props;
  const store = useBearStore(state => ({
    currentFilter: state.currentFilter,
    setArticleList: state.setArticleList,
    articleList: state.articleList,
    getArticleList: state.getArticleList
  }));
  useArticleListHook({ feedUuid })

  const renderList = (): JSX.Element[] => {
    return (store.articleList || []).map((article: any, idx: number) => {
      return (
        <ArticleLineItem
          article={ article }
          key={ article.id }
        />
      );
    });
  };

  return (
    <div className="grid grid-cols-1 pl-2 grid-rows-[calc(100% - var(--app-toolbar-height))]">
      <ul className="m-0 pb-2">{ renderList() }</ul>
    </div>
  );
};