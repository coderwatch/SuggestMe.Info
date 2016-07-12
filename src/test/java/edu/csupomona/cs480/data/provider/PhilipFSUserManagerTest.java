package edu.csupomona.cs480.data.provider;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import edu.csupomona.cs480.data.User;

public class PhilipFSUserManagerTest {
	private FSUserManager userManager;
	
	@Before
	public void setup()
	{
		userManager = new FSUserManager();
		User user1 = new User();
		user1.setId("1357");
		user1.setName("Howard");
		user1.setMajor("Math");
		User user2 = new User();
		user2.setId("2468");
		user2.setName("Sarah");
		user2.setMajor("Physics");
		
		userManager.updateUser(user1);
		userManager.updateUser(user2);
		
	}
	@Test
	public void testShowUser1()
	{
		User testUser = userManager.getUser("1357");
		Assert.assertEquals("1357", testUser.getId());
		Assert.assertEquals("Howard", testUser.getName());
		Assert.assertEquals("Math", testUser.getMajor());
	}
	
	@Test
	public void testDeleteUser2()
	{
		userManager.deleteUser("2468");
		Assert.assertNull(userManager.getUser("2468"));
		Assert.assertNotNull(userManager.getUser("1357"));
	}
	
}
