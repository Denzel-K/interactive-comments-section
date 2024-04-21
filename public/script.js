window.onload = () => {
  //Render reply field
  document.querySelectorAll('.get-reply').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
       // Find the corresponding reply-form-box
      const replyFormBox = button.closest('.comment-box').querySelector('.reply-form-box');

      // Toggle the visibility of the reply-form-box
      replyFormBox.classList.toggle('hidden');
    });
  });

  document.querySelectorAll('.get-reply-reply').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
       // Find the corresponding reply-form-box
      const replyFormBox = button.closest('.reply-flex').querySelector('.reply-reply-field');

      // Toggle the visibility of the reply-form-box
      replyFormBox.classList.toggle('hidden');
    });
  });

  //Add comment
  const add_desktop = document.querySelector('#add-comment-desktop');
  const add_mobile = document.querySelector('#add-comment-mobile');

  add_desktop.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = add_desktop.comment.value;
    const createdAt = new Date().toDateString();
    const score = 0;
    const user = {
      image: {
        png: "images/avatars/image-juliusomo.png",
        webp: "images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    }

    try {
      const res = await fetch('/createComment', {
        method: 'POST',
        body: JSON.stringify({ content, createdAt, score, user }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();
      console.log (data);

      if (data.new_comment) {
        location.assign('/');
      }
    }
    catch(err) {
      console.log (err);
    }

  })

  add_mobile.addEventListener('submit', async (e) => {
    e.preventDefault();

    const content = add_mobile.comment.value;
    const createdAt = new Date().toDateString();
    const score = 0;
    const user = {
      image: {
        png: "images/avatars/image-juliusomo.png",
        webp: "images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    }
    const replies = []


    try {
      const res = await fetch('/createComment', {
        method: 'POST',
        body: JSON.stringify({ content, createdAt, score, user }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();
      console.log (data);

      if (data.new_comment) {
        location.assign('/');
      }
    }
    catch(err) {
      console.log (err);
    }

  })

  //Make reply
  const comment_reply_desktop = document.querySelector('#comment-reply-desktop');
  const comment_reply_mobile = document.querySelector('#comment-reply-mobile');
  const reply_reply_desktop = document.querySelector('#reply-reply-desktop');
  const reply_reply_mobile = document.querySelector('#reply-reply-mobile');

  comment_reply_desktop.addEventListener('submit', async (e)=> {
    e.preventDefault();

    const content = comment_reply_desktop.comment.value;
    const createdAt = new Date().toDateString();
    const score = 0;
    const user = {
      image: {
        png: "images/avatars/image-juliusomo.png",
        webp: "images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    }
    const replyingTo = comment_reply_desktop.replyingTo.value;

    try {
      const res = await fetch('/createReply', {
        method: 'POST',
        body: JSON.stringify({ content, createdAt, score, user, replyingTo }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();
      console.log (data);

      if (data.reply) {
        location.assign('/');
      }
    }
    catch(err) {
      console.log (err);
    }
  })

  comment_reply_mobile.addEventListener('submit', async (e)=> {
    e.preventDefault();

    const content = comment_reply_mobile.comment.value;
    const createdAt = new Date().toDateString();
    const score = 0;
    const user = {
      image: {
        png: "images/avatars/image-juliusomo.png",
        webp: "images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    }
    const replyingTo = comment_reply_mobile.replyingTo.value;

    try {
      const res = await fetch('/createReply', {
        method: 'POST',
        body: JSON.stringify({ content, createdAt, score, user, replyingTo }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();
      console.log (data);

      if (data.reply) {
        location.assign('/');
      }
    }
    catch(err) {
      console.log (err);
    }
  })

  reply_reply_desktop.addEventListener('submit', async (e)=> {
    e.preventDefault();

    const content = reply_reply_desktop.comment.value;
    const createdAt = new Date().toDateString();
    const score = 0;
    const user = {
      image: {
        png: "images/avatars/image-juliusomo.png",
        webp: "images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    }
    const replyingTo = reply_reply_desktop.replyingTo.value;

    try {
      const res = await fetch('/replyToReply', {
        method: 'POST',
        body: JSON.stringify({ content, createdAt, score, user, replyingTo }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();

      if (data.repliesToReply) {
        location.assign('/');
      }
    }
    catch(err) {
      console.log (err);
    }
  })

  reply_reply_mobile.addEventListener('submit', async (e)=> {
    e.preventDefault();

    const content = reply_reply_mobile.comment.value;
    const createdAt = new Date().toDateString();
    const score = 0;
    const user = {
      image: {
        png: "images/avatars/image-juliusomo.png",
        webp: "images/avatars/image-juliusomo.webp"
      },
      username: "juliusomo"
    }
    const replyingTo = reply_reply_mobile.replyingTo.value;

    try {
      const res = await fetch('/replyToReply', {
        method: 'POST',
        body: JSON.stringify({ content, createdAt, score, user, replyingTo }),
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json();
      console.log (data);

      if (data.repliesToReply) {
        location.assign('/');
      }
    }
    catch(err) {
      console.log (err);
    }
  })

  // Delete operations
  const show_delete_comment = document.querySelectorAll('.show-delete-comment');
  const show_delete_reply = document.querySelectorAll('.show-delete-reply');
  const show_delete_subreply = document.querySelectorAll('.show-delete-subreply');

  const comment_modal = document.querySelector('.comment_modal');
  const reply_modal = document.querySelector('.reply_modal');
  const subreply_modal = document.querySelector('.subreply_modal');

  const close_comment_modal = document.querySelector('.close-comment-modal');
  const close_reply_modal = document.querySelector('.close-reply-modal');
  const close_subreply_modal = document.querySelector('.close-subreply-modal');

  show_delete_comment.forEach(showBtn => {
    showBtn.addEventListener('click', ()=> {
      var commentId = showBtn.getAttribute('data-id');

      comment_modal.showModal();
      
      close_comment_modal.onclick = ()=> {
        comment_modal.close();
      }

      const delete_comment = document.querySelector('.delete-comment');
      delete_comment.onclick = async (e)=> {
        // Send a request to the server to delete the comment
        try {
          const res = await fetch(`/delete-comment/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
          });

          if (res.status === 200) {
              console.log('Comment deleted successfully');
              location.reload();
          } else {             
            console.error('Failed to delete comment');
          }
        }
        catch (err){
          console.log(err)
        }
      }
    })
  });

  show_delete_reply.forEach(showBtn => {
    showBtn.addEventListener('click', ()=> {
      var replyId = showBtn.getAttribute('data-id');

      reply_modal.showModal();
      
      close_reply_modal.onclick = ()=> {
        reply_modal.close();
      }

      const delete_reply = document.querySelector('.delete-reply');
      delete_reply.onclick = async (e)=> {
        // Send a request to the server to delete the reply
        try {
          const res = await fetch(`/delete-reply/${replyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
          });

          if (res.status === 200) {
              console.log('reply deleted successfully');
              location.reload();
          } else {             
            console.error('Failed to delete reply');
          }
        }
        catch (err){
          console.log(err)
        }
      }
    })
  });

  show_delete_subreply.forEach(showBtn => {
    showBtn.addEventListener('click', ()=> {
      var subreplyId = showBtn.getAttribute('data-id');

      subreply_modal.showModal();
      
      close_subreply_modal.onclick = ()=> {
        subreply_modal.close();
      }

      const delete_subreply = document.querySelector('.delete-subreply');
      delete_subreply.onclick = async (e)=> {
        // Send a request to the server to delete the reply
        try {
          const res = await fetch(`/delete-subreply/${subreplyId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
          });

          if (res.status === 200) {
              console.log('reply deleted successfully');
              location.reload();
          } else {             
            console.error('Failed to delete reply');
          }
        }
        catch (err){
          console.log(err)
        }
      }
    })
  });

  // document.querySelectorAll('.edit').forEach(edit_btn => {
  //   edit_btn.onclick = (e)=> {
  //     e.preventDefault();
  //      // Find the corresponding reply-form-box
  //     const contentBody = edit_btn.closest('.comment').querySelector('.reply-form-box');

  //     // Toggle the visibility of the reply-form-box
  //     replyFormBox.classList.toggle('hidden');
  //   }
  // })
}