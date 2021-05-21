<template>
  <div>
    <div>
      <UserSearch />
      
      <ProfileButton />
    </div>
  </div>
</template>

<script>
import ProfileButton from '../component/ProfileButton'
import UserSearch from '../component/UserSearch'
import Notifications from '../component/Notifications'
export default {
  name: 'Menu',
  components: {
    ProfileButton,
    UserSearch,
   
  }
}
</script>
