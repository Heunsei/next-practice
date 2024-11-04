"use client";

import Link from "next/link";
import styles from "./page.module.css";
import React from "react";

interface post {
  id: number;
  content: string;
  title: string;
}

interface propsType {
  data: post[];
}

export default function ListItem(props: propsType) {
  return (
    <div>
      {props.data.map((post, i) => {
        console.log(post);
        return (
          <div className={styles.card} key={i}>
            <div className={styles.top}>
              <span
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  fetch(`/api/post/delete/${post.id}`, {
                    method: "delete",
                  })
                    .then(() => {
                      const target = e.target as HTMLButtonElement;
                      const deleteTarget = target.parentElement?.parentElement;
                      if (target && deleteTarget) {
                        deleteTarget.style.opacity = "0";
                        setTimeout(() => {
                          deleteTarget.style.display = "none";
                        }, 1000);
                      }
                    })
                    .catch((err) => console.log(err));
                }}
              >
                🗑️
              </span>
              <Link href={`/detail/${post.id}`}>{post.title}</Link>
            </div>
            <div className={styles.bottom}>
              <p>{post.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
