<script type="text/jsx">
  export default {
    name: "comment",

    functional: true,

    props: ['comment-data'],

    render(h, c) {
      let comments = c.props.commentData;

      return (
        <div class="comments" onClick={e => {e.stopPropagation();}}>
          {
            comments.map((comment, index) => (
              <div class="container" style={{
                backgroundColor: index % 2 === 0 ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.05)'
              }}>
                <p><strong>{ comment.user }</strong><br/>{ comment.content }</p>
              </div>
            ))
          }
        </div>
      );
    }
  }
</script>

<style lang="scss">
  .comments {
    width: 400px;
    background-color: #222;
    border-radius: 5px;
    text-align: left;
    overflow: hidden;
    box-shadow: 0 3px 20px rgba(0, 0, 0, 0.8);

    .container {
      padding: 10px 20px;

      p {
        font-size: 0.9em;
        line-height: 1.5em;
        color: rgb(130, 130, 130);

        strong {
          color: rgb(191, 191, 191);
        }
      }
    }
  }
</style>
