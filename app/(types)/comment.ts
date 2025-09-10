export interface CommentInterface {
  id?: number;                // comment_id (nullable in DB → optional)
  postId:number;             // ManyToOne 관계 → 객체 참조
  parentId?: number | null;    // 부모 댓글 ID
  body: string;                // 댓글 본문 (not null)
  createdAt?: string;          // LocalDateTime → ISO string
  isDel?:boolean;
}
