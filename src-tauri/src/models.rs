use chrono::{DateTime, Utc};

#[derive(Queryable)]
pub struct Feed {
  pub id: i32,
  pub uuid: String,
  pub title: String,
  pub link: String,
  pub image: String,
  pub feed_url: String,
  pub description: String,
  pub pub_date: DateTime<Utc>,
}

#[derive(Queryable)]
pub struct FeedArticleRelation {
  pub id: String,
  pub feed_uuid: String,
  pub article_uuid: String,
}

#[derive(Queryable)]
pub struct Article {
  pub id: String,
  pub uuid: String,
  pub title: String,
  pub link: String,
  pub image: String,
  pub feed_url: String,
  pub description: String,
  pub content: String,
  pub pub_date: DateTime<Utc>,
}

#[derive(Insertable)]
#[diesel(table_name = feeds)]
pub struct NewFeed<'a> {
  pub id: i32,
  pub uuid: &'a String,
  pub title: &'a String,
  pub link: &'a String,
  pub image: &'a String,
  pub feed_url: &'a String,
  pub description: &'a String,
  pub pub_date: DateTime<Utc>,
}
