"""
Data Seeder

This module defines functions to seed the database with sample data.
"""

from app import serviceapp, db
from app.models import Agent, Customer, Interaction

def seed_data():
    agents = [
        Agent(id=1, email='agent1@example.com', first_name='John', last_name='Doe'),
        Agent(id=2, email='agent2@example.com', first_name='Jane', last_name='Smith'),
        Agent(id=3, email='agent3@example.com', first_name='Emily', last_name='Johnson'),
        Agent(id=4, email='agent4@example.com', first_name='Michael', last_name='Brown'),
        Agent(id=5, email='agent5@example.com', first_name='Nathalie', last_name='Green'),
    ]

    for agent in agents:
        agent.set_password('password')

    customers = [
        Customer(id=1, first_name='Alice', last_name='Johnson', email='alice.johnson@example.com'),
        Customer(id=2, first_name='Bob', last_name='Smith', email='bob.smith@example.com'),
        Customer(id=3, first_name='Carol', last_name='Davis', email='carol.davis@example.com'),
        Customer(id=4, first_name='Dan', last_name='Brown', email='dan.brown@example.com'),
        Customer(id=5, first_name='Eve', last_name='Wilson', email='eve.wilson@example.com'),
        Customer(id=6, first_name='Frank', last_name='Moore', email='frank.moore@example.com'),
        Customer(id=7, first_name='Grace', last_name='Taylor', email='grace.taylor@example.com'),
        Customer(id=8, first_name='Henry', last_name='Anderson', email='henry.anderson@example.com'),
        Customer(id=9, first_name='Ivy', last_name='Thomas', email='ivy.thomas@example.com'),
        Customer(id=10, first_name='Jack', last_name='Martinez', email='jack.martinez@example.com')
    ]

    interactions = [
        Interaction(agent_id=1, customer_id=1, type='Email', content='Dear Alice,\n\nThank you for reaching out regarding your account details. I have reviewed your account and noticed a discrepancy in your recent billing statement. I have corrected the error and you will see the updated statement in your email shortly. If you have any further questions or need additional assistance, please do not hesitate to contact me.\n\nBest regards,\nJohn Doe'),
        Interaction(agent_id=2, customer_id=2, type='Phone', content='During our phone call, Bob expressed concerns about his recent bill being higher than expected. I explained the new pricing structure and identified an error in the charges. I assured him that the issue would be resolved within 48 hours. Bob was satisfied with the resolution and appreciated the prompt assistance.'),
        Interaction(agent_id=3, customer_id=3, type='Chat', content='Carol inquired about the features of our premium product. I provided a detailed comparison of the standard and premium versions, highlighting the additional features and benefits. Carol was particularly interested in the advanced analytics and customer support options available with the premium product. I offered her a free trial to explore these features further.'),
        Interaction(agent_id=4, customer_id=4, type='Email', content='Hi Dan,\n\nI hope you\'re doing well. Following up on our previous conversation, I wanted to provide you with an update on your service request. Our technical team has successfully resolved the issue with your account access. You should now be able to log in without any problems. If you encounter any further issues, please let us know.\n\nThank you for your patience and understanding.\n\nBest,\nMichael Brown'),
        Interaction(agent_id=5, customer_id=5, type='Phone', content='During our call, Eve needed assistance choosing the right service plan for her needs. I walked her through the various options, emphasizing the benefits of each. Eve was leaning towards the family plan due to its cost-effectiveness and the ability to share with family members. I helped her sign up for the plan and ensured she understood all the features included.'),
        Interaction(agent_id=1, customer_id=6, type='Chat', content='Frank contacted us via chat with a technical question about integrating our service with his existing software. I provided step-by-step instructions and shared a link to our detailed integration guide. Frank followed the steps and successfully completed the integration during our chat session. He thanked me for the clear and concise instructions.'),
        Interaction(agent_id=2, customer_id=7, type='Email', content='Hi Grace,\n\nI wanted to share an exciting promotional offer with you. For a limited time, we\'re offering a 20% discount on all annual subscriptions. This is a great opportunity to upgrade your current plan and enjoy additional features at a reduced cost. Please let me know if you\'re interested, and I\'ll be happy to assist you with the upgrade.\n\nBest regards,\nLaura Moore'),
        Interaction(agent_id=3, customer_id=8, type='Phone', content='Henry needed help setting up his new account. Over the phone, I guided him through the registration process, explaining each step clearly. Henry appreciated the thorough assistance and successfully set up his account. I also provided tips on how to get the most out of our service and offered to schedule a follow-up call if he had any further questions.'),
        Interaction(agent_id=4, customer_id=9, type='Chat', content='Ivy reached out via chat with a troubleshooting issue regarding her service not working as expected. I asked her a series of diagnostic questions to narrow down the problem. After identifying the issue, I provided specific troubleshooting steps, which Ivy followed. The issue was resolved, and Ivy was very grateful for the quick and efficient support.'),
        Interaction(agent_id=5, customer_id=10, type='Email', content='Dear Jack,\n\nThank you for providing your feedback on our service. I understand you had concerns about the recent updates to our platform. I have forwarded your feedback to our product development team for review. We take customer feedback seriously and strive to improve our services continuously. If you have any additional concerns or suggestions, please feel free to reach out.\n\nSincerely,\nWilliam Thomas'),
        Interaction(agent_id=1, customer_id=5, type='Email', content='Dear Eve,\n\nI wanted to follow up on our previous conversation about the issues you were experiencing with our mobile app. Our development team has released an update that addresses the bugs you encountered. Please update the app at your earliest convenience and let us know if the issues persist.\n\nBest regards,\nJohn Doe'),
        Interaction(agent_id=2, customer_id=6, type='Phone', content='During our phone call, Frank asked for assistance with setting up his new device. I guided him through the initial setup process and ensured that all his settings were correctly configured. Frank was very pleased with the assistance and expressed his gratitude for the clear and patient guidance.'),
        Interaction(agent_id=3, customer_id=7, type='Chat', content='Grace contacted us via chat with questions about our new loyalty program. I explained the benefits and rewards associated with the program and helped her enroll in it. Grace was excited about the new perks and thanked me for the information and assistance.'),
        Interaction(agent_id=4, customer_id=8, type='Email', content='Hi Henry,\n\nThank you for your recent inquiry about the warranty coverage for your product. I reviewed your account and confirmed that your product is still under warranty. I have processed a service request on your behalf, and our technician will reach out to you within the next 48 hours to schedule a repair appointment.\n\nBest,\nMichael Brown'),
        Interaction(agent_id=5, customer_id=9, type='Phone', content='Ivy called to discuss the details of her recent service charge. I reviewed her account and explained the charges in detail. Ivy was concerned about a late fee, which I was able to waive as a one-time courtesy. She was very appreciative and thanked me for resolving the issue promptly.')

    ]

    # Seed the database
    with serviceapp.app_context():
        db.create_all()
        db.session.bulk_save_objects(agents)
        db.session.bulk_save_objects(customers)
        db.session.bulk_save_objects(interactions)
        db.session.commit()
